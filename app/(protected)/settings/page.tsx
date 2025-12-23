import { auth } from '@/auth';
import { User } from '@/lib/model/users';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Settings as SettingsIcon } from 'lucide-react';
import dbConnect from '@/lib/mongodb';

export default async function Settings() {
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

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                    <SettingsIcon className="mr-2 text-primary" /> Settings
                </h1>
            </header>

            <Card className="bg-linear-to-br from-primary-light to-white">
                <CardHeader>Account Preferences</CardHeader>
                <CardBody>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preferred Currency</label>
                            <select name="preferredCurrency" defaultValue={user.preferredCurrency} className="block w-full px-3 py-2 border rounded-md">
                                <option value="USD">USD ($)</option>
                                <option value="NGN">NGN (₦)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                            </select>
                        </div>
                        <Input label="New Password" type="password" />
                        <Input label="Confirm Password" type="password" />
                        <Button type="submit">Update Settings</Button>
                    </form>
                </CardBody>
            </Card>

            <Card>
                <CardHeader>Notifications</CardHeader>
                <CardBody>
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Email me donation updates
                    </label>
                    <label className="flex items-center mt-2">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Campaign progress alerts
                    </label>
                </CardBody>
            </Card>
        </div>
    );
}