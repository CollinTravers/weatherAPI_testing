export default function Weather_Card(prop){
    return(
        <div className="block text-center py-6 m-5 w-28 bg-green-500 rounded-lg border
                    border-gray-200 shadow-md">
            <h1>
                {prop.title}:
            </h1>
            {prop.data} {prop.text}
        </div>
    )
}