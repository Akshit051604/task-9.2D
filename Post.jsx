import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import { db } from '../utils/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import './Post.css';

function Post() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [postData, setPostData] = useState({
    title: '',
    code: '',
    markdown: '',
    language: 'javascript',
  });

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'markdown', label: 'Markdown' },
  ];

  // Simulate a payment process (replace this with actual payment handling logic)
  const handlePayment = async () => {
    // Simulate a delay for payment processing (e.g., API request to a payment gateway)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const paymentSuccess = true;  // Simulate payment success, change as needed
        if (paymentSuccess) {
          resolve('Payment successful');
        } else {
          reject('Payment failed');
        }
      }, 2000);  // Simulate a 2-second payment processing time
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Step 1: Handle payment (this is the step where you'd integrate actual payment)
      await handlePayment();

      // Step 2: Prepare post data and add to Firestore
      const post = {
        title: postData.title,
        code: postData.code,
        markdown: postData.markdown,
        language: postData.language,
        createdAt: serverTimestamp(),
        likes: 0,
        comments: [],
      };

      console.log('Post data before sending:', post); 
      const docRef = await addDoc(collection(db, 'posts'), post);
      alert('Post created successfully!');

      // Step 3: Reset form data
      setPostData({
        title: '',
        code: '',
        markdown: '',
        language: 'javascript',
      });

      // Step 4: Redirect to the home page after successful payment and post creation
      navigate('/');  // Redirect to home page

    } catch (error) {
      console.error('Error creating post:', error);
      alert(`Failed to create post: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    setPostData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleCodeChange = (editor, data, value) => {
    setPostData((prevData) => ({
      ...prevData,
      code: value,
    }));
  };

  return (
    <div className="post-container">
      <form onSubmit={handleSubmit} className="post-form">
        <div className="post-card">
          <h2>Create a Post</h2>
          <div className="form-group">
            <label htmlFor="postTitle">Post Title</label>
            <input
              id="postTitle"
              type="text"
              value={postData.title}
              onChange={handleInputChange('title')}
              placeholder="Enter post title..."
              className="title-input"
            />
          </div>
          <div className="form-group">
            <div className="code-header">
              <label htmlFor="languageSelect">Code Language</label>
              <select
                id="languageSelect"
                value={postData.language}
                onChange={handleInputChange('language')}
                className="language-select"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="code-editor">
              <CodeMirror
                value={postData.code}
                options={{
                  mode: postData.language,
                  theme: 'material',
                  lineNumbers: true,
                  lineWrapping: true,
                }}
                onBeforeChange={handleCodeChange}
              />
            </div>
          </div>

          {/* Markdown Section */}
          <div className="form-group">
            <label htmlFor="markdownContent">Description (Markdown)</label>
            <div className="markdown-container">
              <div className="markdown-editor">
                <textarea
                  id="markdownContent"
                  value={postData.markdown}
                  onChange={handleInputChange('markdown')}
                  placeholder="Write your post content in markdown..."
                />
              </div>
              <div className="markdown-preview">
                <h4>Preview</h4>
                <div className="preview-content">
                  <ReactMarkdown>{postData.markdown}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Post...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Post;
