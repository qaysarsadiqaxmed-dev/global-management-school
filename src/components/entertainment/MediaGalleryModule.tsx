import React, { useState } from 'react';
import { 
  Film, Image, Video, Upload, Play, Heart, Eye, MessageCircle, 
  Search, Filter, Plus, X, Sparkles, Award, Trophy, Music, Camera, Tag, Check, Share2
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { MediaItem } from '../../types';

const initialMediaItems: MediaItem[] = [
  {
    id: 'media-1',
    title: 'Global Management School Inter-Campus Football Championship Final',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    category: 'Sports & Games',
    description: 'Highlights from the thrilling final match between Mogadishu Main Campus & Hargeisa East Campus.',
    uploadedBy: 'School Sports Department',
    uploadDate: '2026-07-28',
    likes: 142,
    commentsCount: 28,
    views: 1250,
    tags: ['Football', 'SportsDay', 'Championship']
  },
  {
    id: 'media-2',
    title: 'Annual Cultural Festival & Heritage Talent Show 2026',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    category: 'Cultural Festivals',
    description: 'Students displaying traditional poetry, traditional songs, and cultural fashion showcases.',
    uploadedBy: 'Arts & Culture Club',
    uploadDate: '2026-07-20',
    likes: 215,
    commentsCount: 45,
    views: 2400,
    tags: ['Culture', 'Heritage', 'TalentShow']
  },
  {
    id: 'media-3',
    title: 'Science & Innovation Fair 2026 - Robotics Exhibition',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    category: 'Science & Tech',
    description: 'Grade 11 students presenting autonomous solar-powered water filtration prototypes.',
    uploadedBy: 'STEM Faculty',
    uploadDate: '2026-07-15',
    likes: 98,
    commentsCount: 14,
    views: 890,
    tags: ['Robotics', 'ScienceFair', 'STEM']
  },
  {
    id: 'media-4',
    title: 'Graduation Ceremony & Academic Excellence Awards 2026',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    category: 'Ceremonies & Awards',
    description: 'Celebrating our top-performing Grade 12 graduates with principal awards.',
    uploadedBy: 'Executive Office',
    uploadDate: '2026-06-30',
    likes: 310,
    commentsCount: 62,
    views: 3500,
    tags: ['Graduation', 'Excellence', 'ClassOf2026']
  },
  {
    id: 'media-5',
    title: 'School Music Band & Choir Performance at Assembly',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    category: 'Talent Showcase',
    description: 'Special musical arrangement performed by Global Management School student choir.',
    uploadedBy: 'Music Club',
    uploadDate: '2026-07-10',
    likes: 180,
    commentsCount: 31,
    views: 1650,
    tags: ['Music', 'Choir', 'Talent']
  },
  {
    id: 'media-6',
    title: 'Inter-School Girls Basketball Tournament Semi-Finals',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    category: 'Sports & Games',
    description: 'Victory moments from the inter-school tournament.',
    uploadedBy: 'Sports Dept',
    uploadDate: '2026-07-05',
    likes: 124,
    commentsCount: 19,
    views: 1100,
    tags: ['Basketball', 'Tournament', 'Champions']
  }
];

export const MediaGalleryModule: React.FC = () => {
  const { t } = useSchool();
  const [items, setItems] = useState<MediaItem[]>(initialMediaItems);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});

  // New Media Upload Form State
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'image' | 'video'>('image');
  const [newCategory, setNewCategory] = useState<MediaItem['category']>('Sports & Games');
  const [newUrl, setNewUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newUploader, setNewUploader] = useState('Media & Entertainment Team');

  // Comments for Active Media
  const [comments, setComments] = useState<Record<string, string[]>>({
    'media-1': ['Amazing match! Mogadishu team played wonderfully.', 'Subhaanallah great sportsmanship!'],
    'media-2': ['The cultural clothes and poetry were outstanding!'],
  });
  const [commentInput, setCommentInput] = useState('');

  // Handle Like Toggle
  const toggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedItems(prev => {
      const isLiked = !prev[id];
      setItems(itemsList => itemsList.map(item => {
        if (item.id === id) {
          return { ...item, likes: isLiked ? item.likes + 1 : item.likes - 1 };
        }
        return item;
      }));
      return { ...prev, [id]: isLiked };
    });
  };

  // Handle Add Comment
  const handleAddComment = (mediaId: string) => {
    if (!commentInput.trim()) return;
    setComments(prev => ({
      ...prev,
      [mediaId]: [...(prev[mediaId] || []), commentInput.trim()]
    }));
    setItems(prev => prev.map(item => item.id === mediaId ? { ...item, commentsCount: item.commentsCount + 1 } : item));
    setCommentInput('');
  };

  // Handle Local Image/Video File Select
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit New Media
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;

    const newItem: MediaItem = {
      id: `media-${Date.now()}`,
      title: newTitle,
      type: newType,
      url: newUrl,
      thumbnailUrl: newType === 'video' ? newUrl : undefined,
      category: newCategory,
      description: newDescription || 'Official Global Management School entertainment & media upload.',
      uploadedBy: newUploader || 'School Media Club',
      uploadDate: new Date().toISOString().split('T')[0],
      likes: 0,
      commentsCount: 0,
      views: 1,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean)
    };

    setItems([newItem, ...items]);
    setIsUploadModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewUrl('');
    setNewDescription('');
    setNewTags('');
  };

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner Header */}
      <div className="relative overflow-hidden border border-slate-800 bg-slate-900 p-6 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-3">
              <Film className="w-3.5 h-3.5 text-indigo-400" /> ENTERTAINMENT & SCHOOL LIFE MEDIA HUB
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              Global Management School Media & Events
            </h1>
            <p className="text-slate-300 text-xs mt-1 max-w-2xl uppercase tracking-wider font-medium">
              Warbaahinta, Ciyaaraha, Feestada Dhaqanka, Hibooyinka Ardayda iyo Sawirada & Videoga Dugsiga.
            </p>
          </div>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md shrink-0 border border-indigo-400/30"
          >
            <Upload className="w-4 h-4" /> Lasoo Gali Video / Sawir (Upload)
          </button>
        </div>
      </div>

      {/* Media Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-widest">Total Media</span>
            <Camera className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">{items.length}</p>
          <span className="text-[10px] text-slate-400 font-bold uppercase">Photos & Video Clips</span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-widest">Video Highlights</span>
            <Video className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {items.filter(i => i.type === 'video').length}
          </p>
          <span className="text-[10px] text-emerald-600 font-bold uppercase">HD School Videos</span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-widest">Talent Shows</span>
            <Music className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {items.filter(i => i.category === 'Talent Showcase' || i.category === 'Cultural Festivals').length}
          </p>
          <span className="text-[10px] text-amber-600 font-bold uppercase">Cultural & Arts Events</span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-widest">Total Views</span>
            <Eye className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {items.reduce((acc, curr) => acc + curr.views, 0).toLocaleString()}
          </p>
          <span className="text-[10px] text-indigo-600 font-bold uppercase">Student & Parent Views</span>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-800 shadow-2xs">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-indigo-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Doondoon video, sawiro ama dhacdooyin..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-wider focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Category & Type Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-wider"
          >
            <option value="all">All Media (Sawiro & Video)</option>
            <option value="video">Videos Only (Videoyada)</option>
            <option value="image">Photos Only (Sawirada)</option>
          </select>

          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-wider"
          >
            <option value="all">Dhammaan Qeybaha (All Categories)</option>
            <option value="Sports & Games">Sports & Games (Ciyaaraha)</option>
            <option value="Cultural Festivals">Cultural Festivals (Dhaqanka)</option>
            <option value="Talent Showcase">Talent Showcase (Hibooyinka)</option>
            <option value="Ceremony & Awards">Ceremonies & Awards (Shahaadooyinka)</option>
            <option value="Science & Tech">Science & Tech (Sayniska)</option>
          </select>

        </div>

      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => {
          const isLiked = likedItems[item.id];

          return (
            <div
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs hover:border-indigo-600 transition-all cursor-pointer flex flex-col"
            >
              {/* Image / Video Thumbnail Container */}
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <img
                  src={item.type === 'video' ? (item.thumbnailUrl || item.url) : item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                />

                {/* Video Play Overlay Badge */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center group-hover:bg-slate-950/20 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 ml-1 fill-white" />
                    </div>
                  </div>
                )}

                {/* Media Type Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">
                  {item.type === 'video' ? <Video className="w-3 h-3 text-indigo-400" /> : <Image className="w-3 h-3 text-amber-400" />}
                  {item.type}
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-2xs">
                  {item.category}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 uppercase tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Footer Meta & Likes */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="text-[10px] uppercase tracking-wider font-semibold truncate max-w-[140px]">
                    {item.uploadedBy}
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[11px] font-mono">
                      <Eye className="w-3.5 h-3.5 text-slate-400" /> {item.views}
                    </span>
                    <button
                      onClick={e => toggleLike(item.id, e)}
                      className={`flex items-center gap-1 text-[11px] font-bold transition-colors ${
                        isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500' : ''}`} /> {item.likes}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Media Active Viewer Modal (Video Player & Photo Detail) */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-slate-900 text-white border border-slate-800 max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl space-y-0 my-auto">
            
            {/* Modal Header */}
            <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-widest">
                  {activeMedia.category}
                </span>
                <h3 className="font-bold text-sm text-white uppercase tracking-tight line-clamp-1">
                  {activeMedia.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveMedia(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Player Showcase */}
            <div className="bg-black relative aspect-video flex items-center justify-center overflow-hidden">
              {activeMedia.type === 'video' ? (
                <div className="w-full h-full relative flex items-center justify-center">
                  <img
                    src={activeMedia.url}
                    alt={activeMedia.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-slate-950/50 flex flex-col items-center justify-center p-6 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl animate-pulse">
                      <Play className="w-8 h-8 ml-1 fill-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-white">Interactive School Video Stream</p>
                      <p className="text-xs text-slate-300 max-w-md mt-1 font-mono">Playing high-definition school entertainment media broadcast</p>
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={activeMedia.url}
                  alt={activeMedia.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Modal Details & Discussion */}
            <div className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-black uppercase text-white tracking-tight">{activeMedia.title}</h2>
                  <p className="text-xs text-slate-400 mt-1">{activeMedia.description}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => toggleLike(activeMedia.id)}
                    className={`px-4 py-2 border font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                      likedItems[activeMedia.id]
                        ? 'border-red-600 bg-red-600 text-white'
                        : 'border-slate-700 bg-slate-800 text-slate-200 hover:border-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedItems[activeMedia.id] ? 'fill-white' : ''}`} /> {activeMedia.likes} Likes
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Comments & Reactions ({comments[activeMedia.id]?.length || 0})
                </h4>

                <div className="max-h-36 overflow-y-auto space-y-2 pr-2">
                  {(comments[activeMedia.id] || []).map((cmt, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-800 border border-slate-700/60 rounded-lg text-xs">
                      <span className="font-bold text-indigo-300 text-[10px] uppercase block">School Community Member</span>
                      <p className="text-slate-200 mt-0.5">{cmt}</p>
                    </div>
                  ))}
                  {(!comments[activeMedia.id] || comments[activeMedia.id].length === 0) && (
                    <p className="text-xs text-slate-500 italic">No comments yet. Be the first to comment!</p>
                  )}
                </div>

                {/* Comment Input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    placeholder="Qor faallo ama bogaadin..."
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 text-xs text-white uppercase tracking-wider font-semibold focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => handleAddComment(activeMedia.id)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 font-bold text-xs uppercase tracking-wider text-white"
                  >
                    Post
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* Upload New Media Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 dark:border-slate-700">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base uppercase tracking-wider">
                  Lasoo Gali Media (Upload Video/Photo)
                </h3>
              </div>
              <button onClick={() => setIsUploadModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs font-semibold">
              
              <div>
                <label className="block uppercase text-[10px] tracking-widest text-slate-500 dark:text-slate-400 mb-1">
                  Title / Dhacdo (Title of Video or Photo) *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Ciyaarta Kubadda Dugsiga 2026 / School Drama Performance"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 uppercase tracking-wider font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-[10px] tracking-widest text-slate-500 dark:text-slate-400 mb-1">
                    Media Type *
                  </label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as 'image' | 'video')}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 uppercase tracking-wider font-bold"
                  >
                    <option value="image">Photo / Sawir</option>
                    <option value="video">Video / Muuqaal</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase text-[10px] tracking-widest text-slate-500 dark:text-slate-400 mb-1">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as MediaItem['category'])}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 uppercase tracking-wider font-bold"
                  >
                    <option value="Sports & Games">Sports & Games</option>
                    <option value="Cultural Festivals">Cultural Festivals</option>
                    <option value="Talent Showcase">Talent Showcase</option>
                    <option value="Ceremonies & Awards">Ceremonies & Awards</option>
                    <option value="Science & Tech">Science & Tech</option>
                  </select>
                </div>
              </div>

              {/* Local File Selector OR Image/Video URL */}
              <div className="space-y-2">
                <label className="block uppercase text-[10px] tracking-widest text-slate-500 dark:text-slate-400">
                  Select File from Computer OR Paste Image/Video URL *
                </label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="w-full p-2 border border-dashed border-indigo-400 bg-indigo-50/40 dark:bg-indigo-950/20 text-xs font-semibold"
                />
                <input
                  type="url"
                  value={newUrl}
                  onChange={e => setNewUrl(e.target.value)}
                  placeholder="Or paste URL: https://..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[11px]"
                />
              </div>

              {newUrl && (
                <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                  <img src={newUrl} alt="Preview" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-bold uppercase">PREVIEW OK</span>
                </div>
              )}

              <div>
                <label className="block uppercase text-[10px] tracking-widest text-slate-500 dark:text-slate-400 mb-1">
                  Description / Faahfaahin
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="Faahfaahin ku saabsan ciyaarta ama dhacdadani..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                />
              </div>

              <div>
                <label className="block uppercase text-[10px] tracking-widest text-slate-500 dark:text-slate-400 mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={e => setNewTags(e.target.value)}
                  placeholder="e.g. Football, Grade10, Champions"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 font-bold uppercase tracking-wider text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest text-xs shadow-md"
                >
                  Publish to Media Hub
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
