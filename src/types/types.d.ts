type ArrayOfValues = number[];
type ArrayOfColours = string[];

type FirstAlgorithmDataResponse = { timestamp: number; value: number };

type fetchDataProps = {
    window: string;
    ticker: string | string[];
};

type SingleStockData = {
    ticker: string;
    name: string;
    market: string;
    locale: string;
    primary_exchange: string;
    type: string;
    active: boolean;
    currency_name: string;
    cik: string;
    composite_figi: string;
    share_class_figi: string;
    market_cap: number;
    phone_number: string;
    address: {
        address1: string;
        city: string;
        state: string;
        postal_code: string;
    };
    description: string;
    sic_code: string;
    sic_description: string;
    ticker_root: string;
    homepage_url: string;
    total_employees: number;
    list_date: string;
    branding: {
        logo_url: string;
        icon_url: string;
    };
    share_class_shares_outstanding: number;
    weighted_shares_outstanding: number;
    round_lot: number;
};

type convertDataForChartParams = {
    v: number;
    vw: number;
    o: number;
    c: number;
    h: number;
    l: number;
    t: number;
    n: number;
};

type ButtonProps = {
    text: string;
    disabled?: boolean;
    glowing?: boolean;
} & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

type TypingTextItem = {
    name: string;
    ticker: string;
};

type TypingTextAnimationProps = {
    items: TypingTextItem[];
};

type scrapedDataArray = {
    stockName: string;
    ticker: string;
    signal1: string;
    signal2: string;
    signal3: string;
    rsi: string;
};

type BarChartDataProps = {
    c: number;
    h: number;
    l: number;
    n: number;
    o: number;
    t: number;
    v: number;
    vw: number;
};

type FormValue = {
    email: string;
    password: string;
    quantity: string;
    takeProfit: string;
    stopLoss: string;
};

type InputFieldProps = {
    register: UseFormRegister<FormValue>;
    errors: FieldErrors<FormValue>;
    input: keyof FormValue;
    additionalText?: string;
    type?: string;
};
