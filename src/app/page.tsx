"use client"
// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // Jokhon-i keu main site-e ashbe, take dashboard-e niye jabe
  redirect('/dashboard');
}