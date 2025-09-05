import { useState } from "react";
import "./ContactForm.css";

export function ContactForm() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        country: "australia",
        subject: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="fname">First Name</label>
            <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Your name.."
                value={formData.firstname}
                onChange={handleChange}
            />

            <label htmlFor="lname">Last Name</label>
            <input
                type="text"
                id="lname"
                name="lastname"
                placeholder="Your last name.."
                value={formData.lastname}
                onChange={handleChange}
            />

            <label htmlFor="country">Country</label>
            <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
            >
                <option value="australia">Australia</option>
                <option value="canada">Canada</option>
                <option value="usa">USA</option>
            </select>

            <label htmlFor="subject">Subject</label>
            <textarea
                id="subject"
                name="subject"
                placeholder="Write something.."
                value={formData.subject}
                onChange={handleChange}
                style={{ height: "200px" }}
            />

            <input type="submit" value="Submit" />
        </form>
    );
}
