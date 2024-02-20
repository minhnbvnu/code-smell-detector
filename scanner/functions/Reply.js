function Reply(props) {
    const {email, name, photoURL, reply, time} = props.reply;
    return (
        <div className="flex items-center duration-200 mt-2">
            <img
                src={
                    photoURL
                    ? photoURL
                    : `https://unavatar.vercel.app/${email}`
                }
                alt={email}
                className="h-[30px] w-[30px] rounded-md pixelated white-light-shadow"
            />
            <div className="ml-2">
                <h2 className="font-semibold text-xs text-[#222] dark:text-[#fafafa]">
                    {reply}
                </h2>
                <h4 className="text-xs font-semibold text-[#666] capitalize dark:text-[#aaa]">
                    {formatRelative(time, new Date())} •{" "}
                    {name && name}
                </h4>
            </div>
      </div>
    )
}