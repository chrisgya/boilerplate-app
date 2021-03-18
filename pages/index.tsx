import Head from 'next/head';
import { AuthenticatedLayout } from '../components';

export default function Home() {
  return (
    <AuthenticatedLayout>
      <div>
        <h1> Welcome Home!</h1>
      </div>
    </AuthenticatedLayout>
  )
}
