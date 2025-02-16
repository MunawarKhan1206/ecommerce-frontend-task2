// "use client";
// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

// export default function LoginPage() {
//   const { login } = useAuth();
//   const router = useRouter();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false); // Track loading state

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);
//     console.log(formData.email);
//     console.log(formData.password);

//     if (!formData.email || !formData.password) {
//       toast.error("Email and password are required!");
//       return;
//     }

//     const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
//     if (!emailRegex.test(formData.email)) {
//       toast.error("Please enter a valid email!");
//       return;
//     }

//     setLoading(true); // Set loading to true while the login is being processed

//     try {
//       const loginSuccess = await login(formData.email, formData.password);

//       setLoading(false); // Set loading to false after the login process

//       if (loginSuccess) {
//         toast.success("Login Successful!");
//         router.push("/dashboard"); // Redirect to dashboard
//       } else {
//         toast.error("Invalid credentials!");
//       }
//     } catch (error) {
//       setLoading(false);
//       toast.error("An error occurred during login!");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold">Login</h1>
//       <form onSubmit={handleSubmit} className="mt-4">
//         <input
//           type="email"
//           placeholder="Email"
//           className="p-2 border w-full"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="p-2 border w-full mt-2"
//           value={formData.password}
//           onChange={(e) =>
//             setFormData({ ...formData, password: e.target.value })
//           }
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white p-2 w-full mt-2"
//           disabled={loading} // Disable the button while loading
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required!");
      return;
    }
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email!");
      return;
    }
    setLoading(true);
    try {
      const loginSuccess = login(formData.email, formData.password);
      setLoading(false);
      if (loginSuccess) {
        toast.success("Login Successful!"); 
        router.push("/dashboard");
      } else {
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred during login!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border w-full"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border w-full mt-2"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 w-full mt-2"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
