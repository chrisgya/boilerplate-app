import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";


type messageType = {
    message?: string, reset: () => void
}

export const ErrorMessage = (prop: messageType) => {
    return (
        <div className="flex p-4 bg-red-200">
            <div className="mr-4">
                <div className="flex items-center justify-center w-10 h-10 text-white bg-red-600 rounded-full">
                    <FontAwesomeIcon icon={faExclamation} />
                </div>
            </div>
            <div className="flex justify-between w-full">
                <div className="text-red-600">
                    <p className="mb-2 font-bold"> An error occurred: </p>
                    <p className="text-xs"> {prop.message}</p>
                </div>
                <div className="text-sm text-gray-500 cursor-pointer" onClick={prop.reset}>
                    <p className="font-bold">x</p>
                </div>
            </div>
        </div>
    )
}