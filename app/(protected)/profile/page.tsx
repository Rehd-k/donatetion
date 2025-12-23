import { auth } from '@/auth';
import { User } from '@/lib/model/users';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { UserCircle } from 'lucide-react';
import dbConnect from '@/lib/mongodb';

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
        <header className='p-4 bg-blue-50'>
            <p className="md:text-xl text-base font-bold text-gray-600 flex items-center">
                <UserCircle className="mr-2 text-primary" /> Profile
            </p>
        </header>
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