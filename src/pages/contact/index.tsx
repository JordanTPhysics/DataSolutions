"use client";

import { Button } from '@/src/components/ui/button';
import React, { useState } from 'react';
import Link from 'next/link';

const Contact = () => {
    const inputStyle: string = "m-2 p-1 border border-gray-300 rounded-md text-contrast bg-secondary focus:outline-none focus:ring-2 focus:ring-info focus:border-transparent";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        company: "",
        phone: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData)
    }

    return (
        
        <form onSubmit={handleSubmit} className="lg:w-full md:w-[70vw] sm:w-screen form-grid text-contrast p-5 m-5 md:m-3 border-4 lg:border-10 border-border grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 bg-foreground rounded-md place-items-center">
        <div>
            <label>Name:</label><br />
            <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputStyle} />
        </div>
        <div>
            <label>Email:</label><br />
            <input type="text" name="email" value={formData.email} onChange={handleChange} className={inputStyle + " h-25"} />
        </div>
        <div>
            <label>Company:</label><br />
            <input type="text" name="company" value={formData.company} onChange={handleChange} className={inputStyle} />
        </div>
        <div>
            <label>Phone:</label><br />
            <input type="number" name="phone" value={formData.phone} onChange={handleChange} className={inputStyle} />
        </div>
        <div>
            <label>Message:</label><br />
            <textarea name="message" value={formData.message} onChange={handleTextAreaChange} className={inputStyle}></textarea>
        </div>
        <div>
            <Button type="submit" className="bg-success w-20 border-2 border-border smooth hover:scale-110 m-3">Search</Button>
            <Button type="reset" className="bg-danger w-20 border-2 border-border smooth hover:scale-110 m-3"><Link href="/" >Home</Link></Button>
        </div>

    </form>
    );
}

export default Contact;
