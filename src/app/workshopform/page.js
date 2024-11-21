import { useState } from "react";

const WorkshopForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    workshop: "",
    qualification: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/googleSheeta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setResponseMessage("Your registration was successful!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          workshop: "",
          qualification: "",
        });
      } else {
        setResponseMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Workshop Registration Form</h2>
      {responseMessage && (
        <div className="mb-4 text-center text-green-600">{responseMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="workshop" className="block text-sm font-medium">
            Workshop Name
          </label>
          <input
            type="text"
            id="workshop"
            name="workshop"
            value={formData.workshop}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="qualification" className="block text-sm font-medium">
            Qualification
          </label>
          <input
            type="text"
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default WorkshopForm;
