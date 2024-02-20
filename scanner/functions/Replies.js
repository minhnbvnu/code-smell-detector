function Replies({toggleReplies, setToggleReplies, replies}) {
    return (
        <div className="rounded-md border border-[#ccc] dark:bg-[#2f2f2f] dark:border-[#555] hover:bg-white p-2 mt-2">
            <div className="flex items-center justify-between w-full">
                <h1 className="font-semibold text-sm lg:text-base xl:text-lg text-[#555] dark:text-[#ccc]">
                    Replies ({replies && replies.length})
                </h1>
                <span className="text-xs text-[#3d5eff] font-semibold continuous-line cursor-pointer" onClick={() => setToggleReplies(!toggleReplies)}>
                    {!toggleReplies && <>Show</>}
                    {toggleReplies && <>Hide</>}
                </span>
            </div>
            {toggleReplies && replies.map((reply, index) => (
                <Reply key={`reply-${index}`} reply={reply} />   
            ))}
        </div>
    )
}