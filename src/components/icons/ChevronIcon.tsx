type ChevronIconProps = {
    up?: boolean;
    className?: string;
};

export function ChevronIcon({ up = false, className }: ChevronIconProps) {
    return (
        <svg
            className={className}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
        >
            <path
                d={up ? "M3.9165 10.2476L8.41234 5.75173L12.9082 10.2476" : "M3.9165 5.75244L8.41234 10.2483L12.9082 5.75244"}
                stroke="white"
                stroke-width="1.33333"
                stroke-linecap="round" />

        </svg>
    );
}
