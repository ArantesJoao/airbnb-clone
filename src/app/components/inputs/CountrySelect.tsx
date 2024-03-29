'use client'

import useCountries from '@/app/hooks/useCountries'
import Select from 'react-select'
import Image from 'next/image'

export type CountrySelectValue = {
  flag: string
  label: string
  latlng: number[]
  region: string
  value: string
}

interface ContrySelectProps {
  value?: CountrySelectValue
  onChange: (value: CountrySelectValue) => void
}

const CountrySelect: React.FC<ContrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries()

  const flagemojiToPNG = (flag: any) => {
    var countryCode = Array.from(flag, (codeUnit: any) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <Image
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt='flag'
        width={18}
        height={18}
      />
    );
  };

  return (
    <Select
      placeholder="Anywhere"
      isClearable
      options={getAll()}
      value={value}
      onChange={(value) => onChange(value as CountrySelectValue)}
      formatOptionLabel={(option: any) => (
        <div className='flex flex-row items-center gap-3'>
          <div>{flagemojiToPNG(option.flag)}</div>
          <div>{option.label},
            <span className='text-neutral-500 ml-1'>
              {option.region}
            </span>
          </div>
        </div>
      )}
      classNames={{
        control: () => 'p-3 border-2',
        input: () => 'text-lg',
        option: () => 'text-lg'
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: 'black',
          primary25: '#ffe4e6'
        }
      })}
    />
  );
}

export default CountrySelect;