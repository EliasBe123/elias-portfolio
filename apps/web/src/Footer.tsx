export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12 flex justify-center">
        <div className="border-t-4 border-green-500 w-2/3 text-center">
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