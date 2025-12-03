import { memo } from "react";
import loginBg from "../../assets/images/login-bg.jpg";
import verified from "../../assets/svg/verified.svg";
import { KeyRound, UserCircle2 } from "lucide-react";
import { Divider } from "primereact/divider";

const LoginComponent = memo(({ loading, userDetail, setUserDetail, handleSubmit }) => {
    return (
        <div className="grid grid-cols-5 w-full p-6 min-h-screen">
            <div
                className="col-span-2 relative flex justify-center items-center rounded-lg overflow-hidden"
                style={{
                    backgroundImage: `url(${loginBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="bg-white/30 backdrop-blur-lg rounded-md p-4 shadow-2xl max-w-sm text-[#020618] space-y-6">
                    <div className="font-semibold text-xl">V-Board</div>
                    <div className="space-y-2">
                        <div className="text-2xl font-extralight tracking-wide">Just one step away from simplifying your workflow.</div>
                        <p className="text-xs font-normal">A powerful platform built to digitize inspections, automate documentation, and keep you in control effortlessly & efficiently.</p>
                    </div>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <img src={verified} className="w-5 h-5 mr-2" /><span className="text-sm">Automate evidence collection and reporting</span>
                        </li>
                        <li className="flex items-center">
                            <img src={verified} className="w-5 h-5 mr-2" /><span className="text-sm">Collaborate seamlessly with your team</span>
                        </li>
                        <li className="flex items-center">
                            <img src={verified} className="w-5 h-5 mr-2" /><span className="text-sm">Monitor status in real time, from anywhere</span>
                        </li>
                    </ul>
                    <Divider className="custom-divider" />
                    <div className="text-sm font-normal leading-6">“No more paperwork or back-and-forth — V-Board lets me inspect, review, and submit everything in one place. It's a total game-changer!”</div>
                </div>
            </div>
            <div className="col-span-3 flex justify-center items-center">
                <div className="max-w-xs space-y-4">
                    <div className="text-2xl font-semibold">V-Board</div>
                    <div className="text-2xl font-semibold">Welcome Back!</div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserCircle2 className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="text"
                                    required
                                    value={userDetail?.username}
                                    onChange={(e) => setUserDetail({ ...userDetail, username: e.target.value })}
                                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-20 px-4 py-2 border"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <KeyRound className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={userDetail?.password}
                                    onChange={(e) => setUserDetail({ ...userDetail, password: e.target.value })}
                                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-20 px-4 py-2 border"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="text-xs text-gray-500 mt-1 ">
                                Forgot password?
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center py-3 px-4 mt-8 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Logging in...' : `Login`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
});

export default LoginComponent;