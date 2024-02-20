function ReplyBox({id, toggleReplyBox, user, comments, comment, review, index, fetchAgain, setFetchAgain, setOpen}) {
    const [reply, setReply] = React.useState('');
    const sendReply = () => {
        const url = `/api/POST/${review ? `comment-review-cheatsheet` : `comment-cheatsheet`}`;
        if(user?.email){
            if(reply.trim()) {
                const temp = [...comments];
                temp[index].replies = comments[index].replies ? [...comments[index].replies] : [];
                temp[index].replies.unshift({
                    name: user.displayName ? user.displayName : "",
                    photoURL: user.photoURL ? user.photoURL : "",
                    reply: reply,
                    email: user.email,
                    time: new Date().getTime(),
                });
                fetch(url, {
                    method: "POST",
                    body: JSON.stringify({
                    id: id,
                    comments: [...temp],
                    }),
                });

                setFetchAgain(fetchAgain + 1);
                setReply('');
            } 
        } else setOpen(true);
    }
    return (
        <>
            {toggleReplyBox && <div className="reply-box">
                <div className="flex items-center justify-between rounded-md border border-[#3d5eff] dark:bg-[#1F1F1F] mt-2 p-1">
                    <input
                        type="text"
                        value={reply}
                        onChange={e => setReply(e.target.value)}
                        placeholder={`Replying to ${comment.name}...`}
                        className="h-full py-1 pl-2 w-full bg-transparent"
                        onKeyDown={e => {if(e.keyCode === 13) {sendReply()}}}
                    />        
                    <div
                        className="bg-[#3d5eff] p-3 pr-4 cursor-pointer shine rounded-lg"
                        onClick={sendReply}
                    >
                    <FiSend
                        className="text-white"
                        style={{ transform: "rotate(45deg)" }}
                    />
                    </div>
                </div>    
            </div>}
        </>
    )
}