require('dotenv').config();

const genToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  );
}

const decToken = (token) => {
    const data = jwt.verify(token, JWT_SECRET);
  
    return data.userId;
}

module.exports = {
  genToken,
  decToken,
}
