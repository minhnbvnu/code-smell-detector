function ReplyButton({toggleReplyBox, setToggleReplyBox}) {
    return (
        <span className="text-xs text-[#3d5eff] font-semibold continuous-line cursor-pointer" onClick={() => setToggleReplyBox(!toggleReplyBox)}>
            {toggleReplyBox && <>Close Reply</>}
            {!toggleReplyBox && <>Reply</>}
        </span>
    )
}