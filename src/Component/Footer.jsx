import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaYoutube } from 'react-icons/fa';
import { HiMail, HiPhone } from 'react-icons/hi';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { BsCreditCard, BsShieldCheck } from 'react-icons/bs';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6">
            <div className="container mx-auto px-4">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-pink-400">AafnaiBazaar</h3>
                        <p className="text-gray-300 mb-4">
                            Your premium destination for fashion and lifestyle. We deliver happiness!
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                                <FaFacebook size={20} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                                <FaPinterest size={20} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                                <FaYoutube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Shop</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">New Arrivals</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Best Sellers</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Sale</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Collections</a></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Help</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">FAQs</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Shipping</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Returns</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-gray-300">
                                <HiMail />
                                <span>liveplan08@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-300">
                                <HiPhone />
                                <span>+977 9749869765</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment & Security */}
                <div className="flex flex-col items-center py-6 border-t border-gray-700">
                    <div className="flex items-center space-x-4 mb-4">
                        <RiSecurePaymentLine size={28} className="text-pink-400" />
                        <BsCreditCard size={24} className="text-gray-300" />
                        <BsShieldCheck size={24} className="text-gray-300" />
                    </div>
                    <p className="text-gray-400 text-sm text-center">
                        We accept all major credit cards and guarantee 100% secure checkout
                    </p>
                </div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-700">
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} XYZ. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;