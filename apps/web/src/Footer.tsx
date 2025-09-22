export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white flex justify-center">
        <div className="border-t-4 py-6 border-green-500 w-3/5 text-center">
          <p>
            &copy; {new Date().getFullYear()} Designed & developed by Elias Benjaminsson under
            <a
                href="https://opensource.org/licenses/MIT"
                className="underline text-blue-400 hover:text-blue-600 mx-1"
                target="_blank"
            rel="noopener noreferrer"
        >
            MIT
        </a>
        .
        </p>
        </div>
    </footer>
  );
}