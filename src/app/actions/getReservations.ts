import prisma from "@/app/libs/prismadb"

interface IParams {
  listingId?: string
  userId?: string
  authorId?: string
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params

    const query: any = {}

    if (listingId) {
      query.listingId = listingId // get all reservations from listing
    }

    if (userId) {
      query.userId = userId // get the reservations made by the user
    }

    if (authorId) {
      query.listing = { userId: authorId } // see reservations to your listing
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }))

    return safeReservations
  } catch (error: any) {
    throw new Error(error)
  }
}
