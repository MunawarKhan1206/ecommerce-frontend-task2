// // "use client";
// // import { createContext, useContext, useEffect, useState } from "react";
// // import jwt from "jsonwebtoken";

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //       try {
// //         const decoded = jwt.decode(token);
// //         if (decoded) setUser(decoded);
// //       } catch (error) {
// //         console.error("Invalid token");
// //       }
// //     }
// //   }, []);
// //   const login = (email, password) => {
// //     if (email === "test@example.com" && password === "password") {
// //       const fakeUser = { id: "123", name: "John Doe", email };
// //       const token = jwt.sign(fakeUser, "secret", { expiresIn: "1h" });

// //       localStorage.setItem("token", token);
// //       setUser(fakeUser);
// //       return true;
// //     }
// //     return false;
// //   };

// //   // Logout function
// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     setUser(null);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);
// "use client";
// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import jwt from "jsonwebtoken";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // Loading state for async operations

//   // Initialize user state based on token in localStorage
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwt.verify(token, "secret"); // Directly verifying the token
//         setUser(decoded); // Set user if token is valid
//       } catch (error) {
//         console.error("Invalid or expired token:", error);
//         localStorage.removeItem("token"); // Remove invalid token
//       }
//     }
//     setLoading(false); // Set loading to false after checking token
//   }, []);

//   // Login function: attempts to log in and store the JWT token in localStorage
//   const login = (email, password) => {
//     if (email === "test@example.com" && password === "password") {
//       const fakeUser = { id: "123", name: "John Doe", email };

//       try {
//         // Ensure the secret key is correct and sign the token
//         const token = jwt.sign(fakeUser, "secret", { expiresIn: "1h" });
//         console.log("Generated Token:", token);
//         localStorage.setItem("token", token);
//         const decoded = jwt.decode(token);
//         setUser(decoded); // Set the user state

//         return true;
//       } catch (error) {
//         console.error("Error signing JWT:", error);
//         return false;
//       }
//     }
//     return false;
//   };
//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null); // Clear the user state
//   };

//   // Loading state ensures we don’t render UI until the token is validated
//   if (loading) {
//     return null; // Or a loading spinner if you prefer
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
"use client";
import { createContext, useContext, useEffect, useState } from "react";

// A simple mock function to encode the user data into a base64 token
const mockSignJWT = (user) => {
  const base64User = btoa(JSON.stringify(user)); // Convert user data to base64 string
  return base64User;
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for async operations

  // Initialize user state based on token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token)); // Decode base64 token
        setUser(decoded); // Set user if token is valid
      } catch (error) {
        console.error("Invalid or expired token:", error);
        localStorage.removeItem("token"); // Remove invalid token
      }
    }
    setLoading(false); // Set loading to false after checking token
  }, []);

  // Login function: attempts to log in and store the mock JWT token in localStorage
  const login = (email, password) => {
    if (email === "test@example.com" && password === "password") {
      const fakeUser = { id: "123", name: "John Doe", email };

      try {
        // Mock JWT Token generation (using base64 encoding)
        const token = mockSignJWT(fakeUser);
        console.log("Generated Token:", token);
        localStorage.setItem("token", token);
        setUser(fakeUser); // Set the user state

        return true;
      } catch (error) {
        console.error("Error signing JWT:", error);
        return false;
      }
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null); // Clear the user state
  };

  // Loading state ensures we don’t render UI until the token is validated
  if (loading) {
    return null; // Or a loading spinner if you prefer
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
