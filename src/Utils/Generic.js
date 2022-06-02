export const checkForType = (
    options, setValidator, setFlatError
) => {
    if (typeof options !== "object") {
        setFlatError("Option must be a object");
        setValidator(false);
        return true;
    }
    if (typeof options?.mic !== "boolean") {
        setValidator(false);
        setFlatError("mic must be a boolean value");
        return true;
    }
    if (typeof options?.camera !== "boolean") {
        setValidator(false);
        setFlatError("camera must be a boolean value");
        return true;
    }
    if (typeof options?.download !== "boolean") {
        setValidator(false);
        setFlatError("download must be a boolean value");
        return true;

    }
    if (typeof options?.timer !== "boolean") {
        setValidator(false);
        setFlatError("timer must be a boolean value");
        return true;

    }
    if (typeof options?.screenShot !== "boolean") {
        setValidator(false);
        setFlatError("screenShot must be a boolean value");
        return true;

    }
    if (typeof options?.autoDowload !== "boolean") {
        setValidator(false);
        setFlatError("autoDowload must be a boolean value");
        return true;

    }
    if (typeof options?.videoFormat !== "string") {
        setValidator(false);
        setFlatError("videoFormat must be a string value");
        return true;

    }
    if (typeof options?.avatar !== "string") {
        setValidator(false);
        setFlatError("videoFormat must be a string value");
        return true;

    }
    if (typeof options?.onStop !== "function") {
        setValidator(false);
        setFlatError("onStop must be a function");
        return true;

    }
    if (typeof options?.onStart !== "function") {
        setValidator(false);
        setFlatError("onStart must be a function");
        return true;

    }
    setValidator(true);
    return true;
};