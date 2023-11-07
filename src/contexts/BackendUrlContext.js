import { useState, createContext } from "react";

export const BackendUrlContext = createContext();

export function BackendUrlProvider({ children }) {
	const [backendUrl, setBackendUrl] = useState("http://localhost:3001");

	return (
		<BackendUrlContext.Provider value={backendUrl}>
			{children}
		</BackendUrlContext.Provider>
	);
}
