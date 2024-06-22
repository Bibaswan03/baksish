"use client"
import React from 'react';

const page = () => {
    return (
        <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
                <h1 className="text-2xl font-bold mb-4">Baksish - Privacy Policy</h1>
                <p className="text-gray-600 mb-2">Last Updated: 01 June,2024</p>

                <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                    <strong>Personal Information:</strong> When you create an account or use our service, we may collect personal information such as your name, email address, phone number, and payment information.
                </p>
                <p className="text-gray-600 mb-4">
                    <strong>Usage Data:</strong> We collect information on how you access and use the service, including your IP address, browser type, operating system, and pages visited.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
                <div className="text-gray-600 mb-4">
                    We use the information we collect to:
                    <ul className="list-disc list-inside">
                        <li>Provide, operate, and maintain our service.</li>
                        <li>Improve, personalize, and expand our service.</li>
                        <li>Understand and analyze how you use our service.</li>
                        <li>Develop new products, services, features, and functionality.</li>
                        <li>Process transactions and send related information.</li>
                        <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the service.</li>
                    </ul>
                </div>

                <h2 className="text-xl font-semibold mt-6 mb-2">3. Sharing Your Information</h2>
                <div className="text-gray-600 mb-4">
                    We do not share your personal information with third parties except in the following cases:
                    <ul className="list-disc list-inside">
                        <li>With your consent.</li>
                        <li>To comply with legal obligations.</li>
                        <li>To protect and defend our rights and property.</li>
                        <li>With service providers who perform services on our behalf.</li>
                    </ul>
                </div>

                <h2 className="text-xl font-semibold mt-6 mb-2">4. Security of Your Information</h2>
                <p className="text-gray-600 mb-4">
                    We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Data Protection Rights</h2>
                <div className="text-gray-600 mb-4">
                    Depending on your location, you may have the following rights regarding your personal information:
                    <ul className="list-disc list-inside">
                        <li><strong>The right to access</strong> – You have the right to request copies of your personal information.</li>
                        <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
                        <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal information, under certain conditions.</li>
                        <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal information, under certain conditions.</li>
                        <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal information, under certain conditions.</li>
                        <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                    </ul>
                </div>

                <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to This Privacy Policy</h2>
                <p className="text-gray-600 mb-4">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
                <p className="text-gray-600">
                    If you have any questions about this Privacy Policy, please contact us at <a href="mailto:baksish247@gmail.com" className='hover:underline'>baksish247@gmail.com</a>
                </p>
            </div>
        </div>
    );
};

export default page;