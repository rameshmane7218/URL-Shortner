import axios, { AxiosResponse } from "axios";

export interface dataProps {
    longUrl: string;
    customName?: string;
}
export interface resultProps {
    message?: string;
    data?: string;
}
export const getShortUrlAPI = async (data: dataProps) => {
    let result: AxiosResponse<resultProps> = await axios.post(
        "https://kitty-love.herokuapp.com/shorten",
        data
    );
    return result.data;
};
