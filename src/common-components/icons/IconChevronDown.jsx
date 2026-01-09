const IconChevronDown = ({ size = 10, ...props }) => (
  <svg
    width={size}
    height={size * 0.7}
    fill="none"
    viewBox="0 0 10 7"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m1 1 4 4 4-4"
    />
  </svg>
);

export default IconChevronDown;
