import { Nunito } from 'next/font/google'
import './globals.css'

import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RentModal from './components/modals/RentModal'
import LoginModal from './components/modals/LoginModal'
import SearchModal from './components/modals/SearchModal'
import RegisterModal from './components/modals/RegisterModal'

import getCurrentUser from './actions/getCurrentUser'
import ToasterProvider from './providers/ToasterProvider'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airnbn Clone',
  description: 'Airbnb Clone with Next 13',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <SearchModal />
        <LoginModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
