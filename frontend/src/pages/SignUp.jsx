import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { doCreateUserWithEmailAndPassword } from '../firebase/auth'

const SignUp = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isSignUping, setIsSignUping] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isSignUping) {
            setIsSignUping(true)
            await doCreateUserWithEmailAndPassword(email, password)
        }
    }

    return (
        <>
            {userLoggedIn && (<Navigate to={'/'} replace={true} />)}

            <main className="w-full h-screen flex justify-center items-center">
                <div className="w-full sm:w-96 p-6 bg-white rounded-xl shadow-lg space-y-6">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-semibold text-gray-800">Create a New Account</h3>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-2 p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition duration-300"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isSignUping}
                                className="w-full mt-2 p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition duration-300"
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                autoComplete="off"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={isSignUping}
                                className="w-full mt-2 p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition duration-300"
                            />
                        </div>

                        {/* Error Message */}
                        {errorMessage && (
                            <div className="text-red-600 font-bold mt-2 text-center">{errorMessage}</div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSignUping}
                            className={`w-full py-3 text-white font-medium rounded-lg transition duration-300 ${isSignUping ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600'}`}
                        >
                            {isSignUping ? 'Signing Up...' : 'Sign Up'}
                        </button>

                        {/* Login Redirect */}
                        <div className="text-center text-sm mt-4">
                            Already have an account?{' '}
                            <Link to={'/SignIn'} className="text-indigo-600 hover:underline font-semibold">
                                Log In
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default SignUp
