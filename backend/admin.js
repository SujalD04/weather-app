const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const serviceAccount = require('./serviceAccountKey.json'); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const jwtSecret = process.env.JWT_SECRET_KEY;

const generateJWT = (user) => {
  // You can customize the JWT payload as needed
  return jwt.sign({ uid: user.uid }, jwtSecret, { expiresIn: '1h' });
};

// Endpoint to handle sign-up
app.post('/api/auth/signup', async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const jwtToken = generateJWT(decodedToken);
    res.json({ token: jwtToken });
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
});

// Endpoint to handle login
app.post('/api/auth/login', async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const jwtToken = generateJWT(decodedToken);
    res.json({ token: jwtToken });
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
});
