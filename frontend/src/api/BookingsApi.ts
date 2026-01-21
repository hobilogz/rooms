// src/api/bookingsApi.ts
import { http } from "./http";

export type BookingDto = {
  id: string;
  organizer: string;
  audienceId: string;
  startTime: string; // ISO
  endTime: string; // ISO
  audience?: { number: string } | null;
};

export type BookingCreateDto = {
  organizer: string;
  audienceId: string;
  startTime: string; // ISO
  endTime: string; // ISO
};

export async function fetchActiveBookings() {
  const { data } = await http.get<BookingDto[]>("/bookings");
  return data;
}

export async function fetchBookingById(id: string) {
  const { data } = await http.get<BookingDto>(`/bookings/${id}`);
  return data;
}

export async function createBooking(payload: BookingCreateDto) {
  const { data } = await http.post<{ id: string }>("/bookings", payload);
  return data;
}

export async function updateBooking(
  id: string,
  payload: Partial<BookingCreateDto>,
) {
  const { data } = await http.patch<{ id: string }>(`/bookings/${id}`, payload);
  return data;
}

export async function deleteBooking(id: string) {
  await http.delete(`/bookings/${id}`);
}
