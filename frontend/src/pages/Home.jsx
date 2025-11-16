import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Welcome!</h1>
      <button
        onClick={() => signOut(auth)}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
