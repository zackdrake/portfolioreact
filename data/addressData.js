export default function getAdressData(t) {
    return [
        {
            id: "01",
            icon: "/images/contact/phone-call 1.png",
            title: "Phone ",
            info: (
                <>
                    <p>
                        <a
                            href="tel:+16 22 44 92"
                            className="text-gray-lite text-lg dark:text-[#A6A6A6] "
                        >
                            +33 6 16 22 44 92
                        </a>
                    </p>
                </>
            ),
            bg: "#FCF4FF",
        },
        {
            id: "02",
            icon: "/images/contact/email 1.png",
            title: "Email ",
            info: (
                <>
                    <p>
                        <a
                            href="mailto:benjamincpayet@gmail.com"
                            className="text-gray-lite text-lg dark:text-[#A6A6A6] "
                        >
                            benjamincpayet@gmail.com
                        </a>
                    </p>
                </>
            ),
            bg: "#EEFBFF",
        },
    ];
}