import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
// import getCurrentUser from './actions/getCurrentUser'

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
        <LoginModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  )
}
