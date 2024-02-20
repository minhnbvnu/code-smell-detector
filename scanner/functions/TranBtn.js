function TranBtn({ onClick, position, tranboxSetting }) {
  const left = position.x + tranboxSetting.btnOffsetX;
  const top = position.y + tranboxSetting.btnOffsetY;

  const touchProps = isMobile
    ? {
        onTouchEnd: onClick,
      }
    : {
        onMouseUp: onClick,
      };

  return (
    <div
      style={{
        cursor: "pointer",
        position: "absolute",
        left,
        top,
        zIndex: 2147483647,
      }}
      {...touchProps}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 32 32"
        version="1.1"
      >
        <path
          d="M0 0 C10.56 0 21.12 0 32 0 C32 10.56 32 21.12 32 32 C21.44 32 10.88 32 0 32 C0 21.44 0 10.88 0 0 Z "
          fill="#209CEE"
          transform="translate(0,0)"
        />
        <path
          d="M0 0 C0.66 0 1.32 0 2 0 C2 2.97 2 5.94 2 9 C2.969375 8.2575 3.93875 7.515 4.9375 6.75 C5.48277344 6.33234375 6.02804688 5.9146875 6.58984375 5.484375 C8.39053593 3.83283924 8.39053593 3.83283924 9 0 C13.95 0 18.9 0 24 0 C24 0.99 24 1.98 24 3 C22.68 3 21.36 3 20 3 C20 9.27 20 15.54 20 22 C19.01 22 18.02 22 17 22 C17 15.73 17 9.46 17 3 C15.35 3 13.7 3 12 3 C11.731875 3.598125 11.46375 4.19625 11.1875 4.8125 C10.01506533 6.97224808 8.80630718 8.35790256 7 10 C8.01790655 12.27071461 8.77442829 13.80784632 10.6875 15.4375 C11.120625 15.953125 11.55375 16.46875 12 17 C11.6875 19.6875 11.6875 19.6875 11 22 C10.34 22 9.68 22 9 22 C8.773125 21.236875 8.54625 20.47375 8.3125 19.6875 C6.73268318 16.45263699 5.16717283 15.58358642 2 14 C2 16.64 2 19.28 2 22 C1.34 22 0.68 22 0 22 C0 14.74 0 7.48 0 0 Z "
          fill="#E9F5FD"
          transform="translate(4,5)"
        />
      </svg>
    </div>
  );
}