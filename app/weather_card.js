export default function Weather_Card(prop){
    return(
        <div className="transition ease-in-out delay-45 hover:-translate-y-1 hover:scale-110 duration-300 hover:shadow-2xl block text-center py-10 min-w-0 w-36 h-64 rounded-lg border
                    bg-gray-100 shadow-md">
            <h1 className="mb-5 text-lg">
                {prop.title}:
            </h1>
            {prop.data} {prop.text}
        </div>
    )
}