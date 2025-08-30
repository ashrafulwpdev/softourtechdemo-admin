import Link from 'next/link'
export default function Page(){
  return <div className="space-y-4">
    <div className="text-lg">Welcome to Softourtech Admin</div>
    <Link className="btn btn-primary" href="/dashboard">Go to Dashboard</Link>
  </div>
}
