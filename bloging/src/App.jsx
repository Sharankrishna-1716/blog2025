import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

function Header() {
  return (
    <header>
      <h1>SHARAXBLOG</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/create-post">Create Post</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <p>&copy; 2025 Blogging Platform</p>
    </footer>
  );
}

function Home() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Exploring the beauty of nature", content: "Nature is wonderful and serene...", imageUrl: "https://via.placeholder.com/800x400" },
    { id: 2, title: "Tech Trends 2025", content: "The future of tech is promising...", imageUrl: "https://via.placeholder.com/800x400" },
    { id: 3, title: "Travel Adventures", content: "A journey through the most beautiful landscapes...", imageUrl: "https://via.placeholder.com/800x400" },
  ]);

  return (
    <div>
      <Header />
      <main>
        <section className="blog-info">
          <h2>Welcome to the Blogging Platform!</h2>
          <p>This platform allows you to create, read, like, comment, and share blog posts. Whether you're a casual blogger, a professional writer, or just someone who loves to share their thoughts, this platform is for you.</p>
        </section>

        <section className="post-feed">
          <h2>Latest Blog Posts</h2>
          <div className="post-cards">
            {posts.map(post => (
              <div key={post.id} className="post-card">
                <img src={post.imageUrl} alt="Post" />
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 100)}...</p>
                <Link to={`/post/${post.id}`} className="read-more">Read More</Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function CreatePost() {
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div>
      <Header />
      <main>
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Write your post here..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPostImage(e.target.files[0])}
          />
          <button type="submit">Create Post</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

function About() {
  return (
    <div>
      <Header />
      <main>
        <h2>About This Platform</h2>
        <p>This is a simple blogging platform where users can create, edit, delete, and comment on blog posts.</p>
      </main>
      <Footer />
    </div>
  );
}

function Contact() {
  return (
    <div>
      <Header />
      <main>
        <h2>Contact Us</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

function Profile() {
  return (
    <div>
      <Header />
      <section>
        <h2>Your Profile</h2>
        <div className="profile-card">
          <img src="https://via.placeholder.com/150" alt="Profile" />
          <h3>Username</h3>
          <button>Edit Profile</button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function PostDetails({ match }) {
  const [post, setPost] = useState({
    title: "Exploring the beauty of nature",
    content: "Nature is wonderful and serene... It's all about connecting with the environment.",
    imageUrl: "https://via.placeholder.com/800x400"
  });
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    if (commentText) {
      setComments([...comments, commentText]);
      setCommentText('');
    }
  };

  return (
    <div>
      <Header />
      <main>
        <section className="post-detail">
          <h2>{post.title}</h2>
          <img src={post.imageUrl} alt="Post" />
          <p>{post.content}</p>
          <div className="comments">
            <h3>Comments:</h3>
            <div className="comment-form">
              <textarea
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button onClick={handleAddComment}>Add Comment</button>
            </div>
            <div className="comments-list">
              {comments.map((comment, index) => (
                <div key={index} className="comment">{comment}</div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    navigate('/');
  };

  return (
    <div>
      <Header />
      <main className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up with:", { username, email, password });
    navigate('/');
  };

  return (
    <div>
      <Header />
      <main className="auth-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default App;
