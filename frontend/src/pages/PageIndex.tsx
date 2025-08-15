import {LayoutDefault} from "../layouts/LayoutDefault.tsx";

export default function PageIndex() {
    return (
        <LayoutDefault>
            <div className="flex  flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold mb-4">Welcome to the Index Page</h1>
                <p className="text-lg">This is the main entry point of your application.</p>
            </div>

        </LayoutDefault>
    );
}