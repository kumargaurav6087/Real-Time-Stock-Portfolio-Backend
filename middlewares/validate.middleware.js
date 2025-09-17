const validate = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    next();
  } catch (err) {
    const status = 422;
    const message = "Fill the input properly"
    const extraDetails = err.issues?.[0]?.message || "Validation failed";
    const error = {
      status,
      message,
      extraDetails,
    }
    
    console.log(error);
    //res.status(400).json({ msg: message });
    next(error);
  }
};

export default validate;
