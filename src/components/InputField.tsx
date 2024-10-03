import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const InputField = ({
    errors,
    register,
    input,
    type,
    additionalText,
}: InputFieldProps) => {
    return (
        <div className="grid w-full items-center gap-1.5">
            <div className="flex items-center justify-between">
                <Label htmlFor={input} className="font-light text-[.8rem]">
                    {input.charAt(0).toUpperCase() + input.slice(1)}
                </Label>
                {errors[input] && (
                    <p className="px-2 text-[0.8rem] text-red-500">
                        {errors[input].message}
                    </p>
                )}
            </div>
            <Input
                {...register(input)}
                type={type || "text"}
                id={input}
                autoComplete="new-password"
            />
            {additionalText && (
                <p className="font-light text-[.7rem] text-zinc-500">
                    {additionalText}
                </p>
            )}
        </div>
    );
};
