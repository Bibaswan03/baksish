"use client"
import React from 'react';

const page = () => {
    return (
        <>
        <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
            
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
                <h1 className="text-2xl font-bold mb-4">Baksish - Terms and Conditions</h1>
                <p className="text-gray-600 mb-2">Last Updated: 01 June, 2024</p>

                <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
                <p className="text-gray-600 mb-4">
                    By accessing or using Baksish, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access the service.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">2. Service Description</h2>
                <p className="text-gray-600 mb-4">
                Baksish provides a platform for hotel waiters to receive tips from customers through online payments like UPI and cards.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">3. User Accounts</h2>
                <p className="text-gray-600 mb-4">
                    To use certain features of our service, you may be required to create an account. You must provide accurate and complete information and keep your account information updated.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">4. Payments</h2>
                <p className="text-gray-600 mb-4">
                    All payments made through Baksish are processed via third-party payment gateways. We do not store any payment information. You agree to comply with all applicable laws and regulations related to your use of the payment services.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">5. User Responsibilities</h2>
                <p className="text-gray-600 mb-4">
                    Users are responsible for maintaining the confidentiality of their account information and are fully responsible for all activities that occur under their account.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">6. Prohibited Activities</h2>
                <div className="text-gray-600 mb-4">
                    Users must not:
                    <ul className="list-disc list-inside">
                        <li>Engage in any unlawful or fraudulent activities.</li>
                        <li>Violate any local, state, national, or international laws or regulations.</li>
                        <li>Interfere with or disrupt the service or servers.</li>
                    </ul>
                </div>

                <h2 className="text-xl font-semibold mt-6 mb-2">7. Termination</h2>
                <p className="text-gray-600 mb-4">
                    We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason, including without limitation if you breach the terms.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">8. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                    In no event shall Baksish, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">9. Governing Law</h2>
                <p className="text-gray-600 mb-4">
                    These terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">10. Changes to Terms</h2>
                <p className="text-gray-600 mb-4">
                    We reserve the right to modify or replace these terms at any time. If a revision is material, we will try to provide at least 14 days' notice prior to any new terms taking effect.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
                <p className="text-gray-600">
                    If you have any questions about these terms, please contact us at <a href="mailto:baksish247@gmail.com" className='hover:underline'>baksish247@gmail.com</a>
                </p>
            </div>
        </div>
        </>
    );
};

export default page;