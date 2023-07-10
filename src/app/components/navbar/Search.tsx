'use client'

import { useMemo } from 'react';
import { differenceInDays } from 'date-fns';
import { BiSearch } from 'react-icons/bi'
import { useSearchParams } from 'next/navigation';

import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';

const Search = () => {
  const searchModal = useSearchModal()
  const params = useSearchParams()
  const { getByValue } = useCountries()

  const endDate = params?.get('endDate')
  const startDate = params?.get('startDate')
  const guestCount = params?.get('guestCount')
  const locationValue = params?.get('locationValue')

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label
    }

    return 'Anywhere'
  }, [getByValue, locationValue])

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string)
      const end = new Date(endDate as string)
      let diff = differenceInDays(end, start)

      if (diff === 0) {
        diff = 1
      }

      return `${diff} Day${diff !== 1 ? 's' : ''}`
    }

    return 'Any week'
  }, [endDate, startDate])

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guest${guestCount !== '1' ? 's' : ''}`
    }

    return 'Add guests'
  }, [guestCount])

  return (
    <div
      onClick={searchModal.onOpen}
      className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-md
        hover:shadow-lg
        transition
        cursor-pointer
      ">
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">
          {locationLabel}
        </div>
        <div
          className="
            hidden
            sm:block
            text-sm
            font-semibold
            px-6
            border-x-[1px]
            flex-1
            text-center
          ">
          {durationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;