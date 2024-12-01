import { useState } from 'react';
import emailjs from 'emailjs-com';
import { services } from '../pages/services/services';
import { useSession } from '../lib/SessionContext';


const Contact: React.FC = () => {

    const { userJourney, addJourneyStep } = useSession();

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        topic: '',
    });


    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        emailjs.send('service_iryb57a',
            'template_up0hhaa',
            { ...form, href: window.location.href },
            '3oQOYQi8O2nwB1qNI');
        setForm({
            name: '',
            email: '',
            phone: '',
            message: '',
            topic: '',
        });

        addJourneyStep(
            {
                action: 'form_submit',
                elementId: 'contact_form',
                pageUrl: window.location.href,
                timestamp: Date.now()
            },
            userJourney!
        );

        alert('Your message has been sent!');
    }

    return (
        <form onSubmit={handleSubmit} className='lg:w-1/4 md:w-1/2 w-full mx-auto flex flex-col'>
            <div className='flex flex-col items-center justify-between p-5'>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={handleFormChange}
                    required
                    className='bg-foreground-secondary rounded-md border-2 border-slate-500 p-2 m-auto text-black'

                />
            </div>
            <div className='flex flex-col items-center justify-between px-5'>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={handleFormChange}
                    required
                    className='bg-foreground-secondary rounded-md border-2 border-slate-500 p-2 m-auto text-black'
                />
            </div>
            <div className='flex flex-col items-center p-4'>
                <label htmlFor='phone'>Phone:</label>
                <input
                    type='tel'
                    id='phone'
                    value={form.phone}
                    onChange={handleFormChange}
                    className='bg-foreground-secondary rounded-md border-2 border-slate-500 p-2 m-auto text-black' />
            </div>
            <div className='flex flex-col items-center p-4 m-4'>
                <label htmlFor="topic">Nature of Enquiry:</label>
                <select
                    id="topic"
                    value={form.topic}
                    onChange={handleFormChange}
                    required
                    className='bg-foreground-secondary rounded-md border-2 border-slate-500 p-2 m-auto text-black'>
                    <option disabled={true} value=''>Select a Topic</option>
                    {services.map((service) => (
                        <option key={service.id} value={service.name}>{service.name}</option>
                    ))}
                    <option value='Curious'>Just Curious</option>
                    <option value='Other'>Other</option>
                </select>
            </div>
            <div className='flex flex-col items-center p-2'>
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    value={form.message}
                    onChange={handleFormChange}
                    required
                    className='bg-foreground-secondary rounded-md border-2 border-slate-500 p-2 mx-auto lg:w-full w-3/4 text-black'
                />
            </div>
            <button className='px-4 mx-auto border-2 bg-success border-slate-500 rounded-md font-bold lg:text-2xl hover:scale-105 transition-all duration-200 ease-linear' type="submit">Send</button>
        </form>
    );
};

export default Contact;