import { NextResponse } from 'next/server';
import { request } from '../utils';
import { URL, OPTIONS } from '../constants';

export async function GET() {
  const FULL_URL = URL + 'tours';

  try {
    const res = await request(FULL_URL, OPTIONS);

    return NextResponse.json(res.results)
  } catch(err) {
    console.error(err);
  }
}