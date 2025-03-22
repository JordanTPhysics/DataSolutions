import React from 'react';

const KhushuPrivacyPolicy: React.FC = () => {
    return (
        <div className="text-left text-text bg-gradient-to-b from-slate-800 to-background h-full flex flex-col">
            <h1 className='lg:text-4xl md:text-3xl text-lg italic text-left border-b-4 border-border'>Khushu Privacy Policy</h1>
            <span className='mx-auto'>Updated Date: 22/03/2025</span>

            <h2 className='lg:text-4xl md:text-3xl text-lg w-[90vw] ml-2 border-b-2 border-border'>1. Introduction</h2>
            <section className='flex flex-col text-text items-center mx-auto my-4'>
                <span>
                    Privacy Policy for the Khushu Android app. Your privacy is important to us, and this Privacy Policy explains how Khushu collects, uses, and protects your personal information.
                </span>
            </section>
            <h2 className='lg:text-4xl md:text-3xl text-lg w-[90vw] ml-2 border-b-2 border-border'>2. Information We Collect</h2>

            <section className='flex flex-col items-left text-text mx-auto my-4'>
                <span className='text-2xl'>We collect the following types of information:</span>
                <ul>
                    <li>
                        Location Data – We collect your location data to help locate places near you and improve the accuracy of the app&apos;s features.
                    </li>
                    <li>
                        Magnetometer Data – We use magnetometer data to provide compass functionality for orienting towards specific locations.
                    </li>
                    <li>
                        Do Not Disturb (DND) Settings – We request access to DND settings to manage notifications based on your location and preferences.
                    </li>
                    <li>
                        Stored Data – Information about the places you select or save within the app is stored locally on your device using Shared Preferences.
                    </li>
                </ul>
            </section>
            <h2 className='lg:text-4xl md:text-3xl text-lg w-[90vw] ml-2 border-b-2 border-border'>3. How We Use Your Information</h2>

            <section className='flex flex-col items-left text-text mx-auto my-4'>
                <span className='text-2xl'>We use the information we collect for the following purposes:</span>
                <ul>
                    <li>To display nearby places based on your location.</li>
                    <li>To provide directional guidance using compass functionality.</li>
                    <li>To adjust notification and DND settings based on your location.</li>
                    <li>To store and display information about saved places.</li>
                </ul>
            </section>
            <h2 className='lg:text-4xl md:text-3xl text-lg w-[90vw] ml-2 border-b-2 border-border'>4. Sharing Your Information</h2>

            <section className='flex flex-col items-left text-text mx-auto my-4'>
                <strong>
                    We do not share or sell your personal information with third parties. All data is stored locally on your device and is not transmitted to external servers.
                </strong>
            </section>
            <h2 className='lg:text-4xl md:text-3xl text-lg w-[90vw] ml-2 border-b-2 border-border'>5. Data Security</h2>

            <section className='flex flex-col items-center text-text mx-auto my-4'>
                <span>
                    We take reasonable steps to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or method of electronic storage is 100% secure.
                </span>
            </section>
            <h2 className='lg:text-4xl md:text-3xl text-lg w-[90vw] ml-2 border-b-2 border-border'>6. Your Rights</h2>

            <section className='flex flex-col items-left text-text mx-auto my-4'>
                <span className='text-2xl'>You have the right to:</span>
                <ol>
                    <li>Access the personal information we hold about you.</li>
                    <li>Request corrections to your personal information.</li>
                    <li>Request deletion of your personal information.</li>
                </ol>
            </section>
            <h2 className='lg:text-4xl md:text-3xl text-lg w-[90vw] ml-2 border-b-2 border-border'>7. Changes to This Privacy Policy</h2>

            <section className='flex flex-col items-left text-text mx-auto my-4'>
                <span>
                    We may update this Privacy Policy from time to time. Any changes will be posted within the app, and your continued use of the app constitutes acceptance of the updated policy.
                </span>
            </section>
            <h2 className='lg:text-4xl md:text-3xl text-lg w-[90vw] ml-2 border-b-2 border-border'>8. Contact Us</h2>

            <section className='flex flex-col items-center text-text mx-auto my-4'>
                <span>
                    If you have any questions or concerns about this Privacy Policy, please contact Pathfinder Data Solutions via <a href="mailto:jordanthij@gmail.com" className='underline text-blue-500 hover:text-green-600'>jordanthij@gmail.com</a>.
                </span>
            </section>
        </div>
    );
};

export default KhushuPrivacyPolicy;