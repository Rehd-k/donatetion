import { auth } from '@/auth';
import { User } from '@/lib/model/users';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { UserCircle } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Link from 'next/link';

export default async function Profile() {
    await dbConnect();
    const session = await auth();
    const { redirect } = await import('next/navigation');

    if (!session?.user) {
        redirect('/login');
    } else {

        if (session.user?.role === 'admin' || session.user?.role === 'admin') {
            redirect('/admin');
        }
    }
    const user = await User.findById(session?.user.id);

    return <>
        <header className="justify-between items-end mb-6 p-2 bg-blue-50 md:flex hidden fixed w-full ml-auto  z-999">

            <Link href="/donate"><Button className="mt-4 md:mt-0">Donate Now</Button></Link>

        </header>
        <div className="md:py-8"></div>
        <div className="space-y-8">


            <Card className="bg-linear-to-br from-primary-light to-white">
                <CardHeader>Personal Details</CardHeader>
                <CardBody>
                    <div className="flex items-center mb-4">
                        <img src={user.avatar || '/default-avatar.png'} alt="Avatar" className="w-16 h-16 rounded-full mr-4" />
                        <Button>Upload Photo</Button>
                    </div>
                    <form className="space-y-4 grid grid-cols-2 md:gap-5 gap-2">
                        <Input label="First Name" defaultValue={user.firstName} />
                        <Input label="Last Name" defaultValue={user.lastName} />
                        <Input label="Email" defaultValue={user.email} disabled />
                        <div className=""></div>

                        <Button type="submit">Save Changes</Button>
                    </form>
                </CardBody>
            </Card>

            <Card>
                <CardHeader>Recent Activity</CardHeader>
                <CardBody>
                    <ul className="space-y-2">
                        <li>Donated $50 to Save the Trees</li>
                        <li>Created Campaign: Help Local Shelter</li>
                    </ul>
                </CardBody>
            </Card>
        </div></>


}