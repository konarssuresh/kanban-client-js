const IconCheck = ({ size = 10, ...props }) => (
  <svg
    width={size}
    height={size * 0.8}
    fill="none"
    viewBox="0 0 10 8"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m1.276 3.066 2.756 2.756 5-5"
    />
  </svg>
);

export default IconCheck;
