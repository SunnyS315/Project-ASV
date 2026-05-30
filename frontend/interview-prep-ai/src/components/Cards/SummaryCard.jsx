// import React from "react";

// const SummaryCard = ({
//     colors,
//     role,
//     topicsToFocus,
//     experience,
//     questions,
//     description,
//     lastUpdated,
//     onSelect,
//     onDelete
// }) => {
//     return   <div
//         className="bg-white border border-gray-300/40 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-100 relative group"
//         onClick={onSelect}
//         >
//         <div 
//             className="rounded-lg p-4 cursor-pointer relative"
//             style={{
//                 background: colors.bgcolor, 
//         }}
//     >
//         <div className="flex items-start">
//             <div className="flex-shrink-0 w-14 h-14 rounded-md bg-white flex items-center justify-center mr-4">
//                 <span className="text-lg font-semibold text-black">
//                     GU
//                 </span>
//         </div>

//         {/* Content Container */}
//         <div className="flex-grow">
//             <div className="flex justify-between items-start">
//                 {/* Title and Skills */}
//                 <div>
//                     <h2 className="text-[17px] font-medium">{role}</h2>
//                     <p className="text-xs font-medium text-gray-900">
//                         {topicsToFocus}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     </div>

//     <button 
//         className="hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-3 right-3"
//         onClick={(e) => {
//             e.stopPropagation();
//             onDelete();
//         }}
//     >
//         Delete
//     </button>
//     </div>

//     <div className="px-3 pb-3">
//         <div className="flex items-center gap-3 mt-4">
//             <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
//                 Experience: {experience} {experience === 1 ? "Year" : "Years"}
//             </div>
            
//             <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
//                 {questions} Q&A
//             </div>

//             <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
//                 Last Updated: {lastUpdated}
//             </div>
//         </div>
        
//         {/* Description */}
//         <p className="text-[12px] text-gray-500 font-medium line-clamp-2 mt-3">
//             {description}
//         </p>
//     </div>
//     </div>
// };

// export default SummaryCard;

import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
    colors,
    role,
    topicsToFocus,
    experience,
    questions,
    description,
    lastUpdated,
    onSelect,
    onDelete,
}) => {
    
    return (
        <div
            className="
                bg-white
                border border-gray-200
                rounded-xl
                p-2
                overflow-hidden
                cursor-pointer
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
                relative
                group
            "
            onClick={onSelect}
        >
            {/* Header */}
            <div
                className="rounded-lg p-5 relative"
                style={{
                    background: colors.bgcolor,
                }}
            >
                <div className="flex items-start">
                    {/* Initials */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-md bg-white flex items-center justify-center mr-4 shadow-sm">
                        <span className="text-2xl font-bold text-black">
                            {getInitials(role)}
                        </span>
                    </div>

                    {/* Role Details */}
                    <div className="flex-grow">
                        <h2 className="text-lg font-semibold text-black">
                            {role}
                        </h2>

                        <p className="text-sm text-gray-600 mt-1">
                            {topicsToFocus}
                        </p>
                    </div>
                </div>

                {/* Delete Button */}
                <button
                    className="
                        absolute top-3 right-3
                        hidden group-hover:flex
                        items-center justify-center
                        w-8 h-8
                        rounded-full
                        bg-white
                        shadow-sm
                        text-gray-500
                        hover:text-red-500
                        transition-all
                    "
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    <LuTrash2 size={16} />
                </button>
            </div>

            {/* Content */}
            <div className="px-3 pb-3">
                {/* Stats */}
                <div className="flex items-center gap-2 mt-4 flex-wrap">
                    <div className="text-[11px] font-medium text-gray-700 px-4 py-1.5 border border-gray-300 rounded-full whitespace-nowrap">
                        Experience: {experience}{" "}
                        {experience === 1 ? "Year" : "Years"}
                    </div>

                    <div className="text-[11px] font-medium text-gray-700 px-4 py-1.5 border border-gray-300 rounded-full whitespace-nowrap">
                        {questions} Q&A
                    </div>

                    <div className="text-[11px] font-medium text-gray-700 px-4 py-1.5 border border-gray-300 rounded-full whitespace-nowrap">
                        Last Updated: {lastUpdated}
                    </div>
                </div>

                {/* Description */}
                <p className="text-[13px] text-gray-600 mt-4 leading-relaxed line-clamp-2">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default SummaryCard;