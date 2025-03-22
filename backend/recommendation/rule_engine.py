"""
香水推荐规则引擎
处理问卷回答并生成香水推荐
"""

from typing import Dict, List, Any, Optional, Tuple
import json
import os
import random

# 香水数据库
PERFUMES_DB = {
    "floral": [
        {
            "id": "iris_elegance",
            "name": "Iris Elegance",
            "brand": "Parfum d'Élégance",
            "notes": ["iris", "pink_pepper", "vanilla"],
            "description": "A sophisticated floral with powdery iris at its heart, enhanced by a hint of pink pepper for modern elegance.",
            "image_url": "/perfumes/iris_elegance.jpg",
            "complexity": 3,
            "intensity": 2,
            "region_affinity": ["europe"],
            "movie_match": ["grand_budapest"]
        },
        {
            "id": "freesia_dream",
            "name": "Freesia Dream",
            "brand": "Jardin Secret",
            "notes": ["freesia", "bergamot", "white_musk"],
            "description": "A delicate floral bouquet centered around luminous freesia, creating a dreamy, ethereal impression.",
            "image_url": "/perfumes/freesia_dream.jpg",
            "complexity": 2,
            "intensity": 1,
            "region_affinity": ["asia", "europe"],
            "music_match": ["classical"]
        }
    ],
    "woody": [
        {
            "id": "cedarwood_symphony",
            "name": "Cedarwood Symphony",
            "brand": "Bois Précieux",
            "notes": ["cedarwood", "sea_salt", "amber"],
            "description": "A harmonious blend of cedarwood enhanced by marine sea salt, creating a sophisticated woody signature.",
            "image_url": "/perfumes/cedarwood_symphony.jpg",
            "complexity": 3,
            "intensity": 4,
            "region_affinity": ["europe"],
            "movie_match": ["legend_1900"]
        },
        {
            "id": "agarwood_ritual",
            "name": "Agarwood Ritual",
            "brand": "Eastern Treasures",
            "notes": ["agarwood", "tea", "sandalwood"],
            "description": "A deep, meditative blend centered around precious agarwood, with contemplative tea notes.",
            "image_url": "/perfumes/agarwood_ritual.jpg",
            "complexity": 5,
            "intensity": 5,
            "region_affinity": ["asia"],
            "mystical_match": ["iching"]
        }
    ],
    "oriental": [
        {
            "id": "amber_nights",
            "name": "Amber Nights",
            "brand": "Treasures of Orient",
            "notes": ["amber", "leather", "frankincense"],
            "description": "A rich oriental fragrance with deep amber and leather, perfect for evenings.",
            "image_url": "/perfumes/amber_nights.jpg",
            "complexity": 4,
            "intensity": 5,
            "region_affinity": ["middle_east"],
            "music_match": ["rock"]
        },
        {
            "id": "whiskey_velvet",
            "name": "Whiskey Velvet",
            "brand": "Spirited Scents",
            "notes": ["whiskey", "tobacco", "vanilla"],
            "description": "A sophisticated oriental with warm whiskey and tobacco, reminiscent of vintage jazz clubs.",
            "image_url": "/perfumes/whiskey_velvet.jpg",
            "complexity": 4,
            "intensity": 4,
            "region_affinity": ["america"],
            "music_match": ["jazz"]
        }
    ],
    "fresh": [
        {
            "id": "ocean_breeze",
            "name": "Ocean Breeze",
            "brand": "Aquatic Essentials",
            "notes": ["sea_salt", "lime", "cucumber"],
            "description": "A refreshing aquatic fragrance with sea salt and crisp citrus, evoking coastal vacations.",
            "image_url": "/perfumes/ocean_breeze.jpg",
            "complexity": 2,
            "intensity": 3,
            "region_affinity": ["america"],
            "travel_match": ["bali"]
        },
        {
            "id": "bamboo_mist",
            "name": "Bamboo Mist",
            "brand": "Jardin Zen",
            "notes": ["bamboo", "matcha", "white_tea"],
            "description": "A delicate, fresh fragrance centered around bamboo and green tea notes for serene clarity.",
            "image_url": "/perfumes/bamboo_mist.jpg",
            "complexity": 2,
            "intensity": 2,
            "region_affinity": ["asia"],
            "breakfast_match": ["kyoto"]
        }
    ],
    "aromatic": [
        {
            "id": "sage_wisdom",
            "name": "Sage Wisdom",
            "brand": "Herbal Rituals",
            "notes": ["sage", "wood_smoke", "pine"],
            "description": "A cleansing aromatic fragrance with sage and smoky notes, inspired by ancient purification rituals.",
            "image_url": "/perfumes/sage_wisdom.jpg",
            "complexity": 3,
            "intensity": 4,
            "region_affinity": ["america"],
            "mystical_match": ["shamanic"]
        },
        {
            "id": "fir_sanctuary",
            "name": "Fir Sanctuary",
            "brand": "Nordic Forests",
            "notes": ["fir", "glacier_water", "moss"],
            "description": "A crisp, aromatic blend of northern fir trees and pure glacier water for a sense of natural refuge.",
            "image_url": "/perfumes/fir_sanctuary.jpg",
            "complexity": 3,
            "intensity": 3,
            "region_affinity": ["europe"],
            "mystical_match": ["runes"]
        }
    ],
    "gourmand": [
        {
            "id": "coffee_break",
            "name": "Coffee Break",
            "brand": "Café Gourmand",
            "notes": ["coffee", "butter", "caramel"],
            "description": "A comforting gourmand centered around rich coffee notes and buttery pastries.",
            "image_url": "/perfumes/coffee_break.jpg",
            "complexity": 3,
            "intensity": 4,
            "region_affinity": ["europe"],
            "breakfast_match": ["paris"]
        },
        {
            "id": "berry_fantasy",
            "name": "Berry Fantasy",
            "brand": "Gourmand Wonders",
            "notes": ["berry", "mushroom", "vanilla"],
            "description": "A whimsical gourmand with juicy berries and unexpected earthy notes for a fantastical journey.",
            "image_url": "/perfumes/berry_fantasy.jpg",
            "complexity": 4,
            "intensity": 3,
            "region_affinity": ["europe"],
            "movie_match": ["alice"]
        }
    ],
    "chypre": [
        {
            "id": "velvet_patchouli",
            "name": "Velvet Patchouli",
            "brand": "Modern Classics",
            "notes": ["patchouli", "electronic_smoke", "leather"],
            "description": "A contemporary chypre with deep patchouli and metallic notes for a futuristic take on a classic structure.",
            "image_url": "/perfumes/velvet_patchouli.jpg",
            "complexity": 5,
            "intensity": 4,
            "region_affinity": ["america"],
            "movie_match": ["blade_runner"]
        },
        {
            "id": "moss_heritage",
            "name": "Moss Heritage",
            "brand": "Vintage Collection",
            "notes": ["moss", "volcanic", "bergamot"],
            "description": "A traditional chypre with oakmoss and citrus, elevated by unusual volcanic minerals for depth.",
            "image_url": "/perfumes/moss_heritage.jpg",
            "complexity": 4,
            "intensity": 3,
            "region_affinity": ["europe"],
            "travel_match": ["easter_island"]
        }
    ]
}

class PerfumeRecommender:
    """香水推荐引擎"""
    
    def __init__(self):
        self.perfumes_db = PERFUMES_DB
    
    def recommend(self, user_answers: Dict[str, Any], limit: int = 3) -> List[Dict[str, Any]]:
        """
        根据用户问卷回答生成香水推荐
        
        Args:
            user_answers: 用户问卷回答，格式为 {question_id: {value: selected_value, ...}}
            limit: 推荐结果数量
            
        Returns:
            推荐香水列表
        """
        # 提取用户偏好特征
        user_profile = self._extract_user_profile(user_answers)
        
        # 为每个香水计算匹配分数
        scored_perfumes = self._score_perfumes(user_profile)
        
        # 选择最匹配的香水
        recommendations = self._select_recommendations(scored_perfumes, limit)
        
        return recommendations
    
    def _extract_user_profile(self, user_answers: Dict[str, Any]) -> Dict[str, Any]:
        """从用户回答中提取偏好特征"""
        profile = {
            "notes_preference": [],
            "complexity_preference": 3,  # 默认中等复杂度
            "intensity_preference": 3,   # 默认中等强度
            "region_affinity": [],
            "specific_matches": {}
        }
        
        # 处理电影问题
        if "1" in user_answers:
            movie_value = user_answers["1"]["value"]
            profile["specific_matches"]["movie_match"] = movie_value
            
            # 根据电影选择调整复杂度偏好
            complexity_map = {
                "grand_budapest": 3,
                "blade_runner": 5,
                "alice": 4,
                "legend_1900": 2
            }
            profile["complexity_preference"] = complexity_map.get(movie_value, 3)
            
            # 添加相关香调
            note_map = {
                "grand_budapest": ["pink_pepper", "iris"],
                "blade_runner": ["patchouli", "electronic_smoke"],
                "alice": ["mushroom", "berry"],
                "legend_1900": ["sea_salt", "cedarwood"]
            }
            profile["notes_preference"].extend(note_map.get(movie_value, []))
        
        # 处理音乐问题
        if "2" in user_answers:
            music_value = user_answers["2"]["value"]
            profile["specific_matches"]["music_match"] = music_value
            
            # 根据音乐选择调整强度偏好
            intensity_map = {
                "jazz": 4,
                "rock": 5,
                "electronic": 2,
                "classical": 3
            }
            profile["intensity_preference"] = intensity_map.get(music_value, 3)
            
            # 添加相关香调
            note_map = {
                "jazz": ["whiskey", "tobacco"],
                "rock": ["leather", "amber"],
                "electronic": ["synthetic_musk", "ozone"],
                "classical": ["cashmere_wood", "paper"]
            }
            profile["notes_preference"].extend(note_map.get(music_value, []))
        
        # 处理早餐问题
        if "4" in user_answers:
            breakfast_value = user_answers["4"]["value"]
            profile["specific_matches"]["breakfast_match"] = breakfast_value
            
            # 根据早餐选择调整地域偏好
            region_map = {
                "paris": ["europe"],
                "kyoto": ["asia"],
                "mexico": ["america"],
                "california": ["america"]
            }
            profile["region_affinity"].extend(region_map.get(breakfast_value, []))
            
            # 添加相关香调
            note_map = {
                "paris": ["coffee", "butter"],
                "kyoto": ["matcha", "bamboo"],
                "mexico": ["chili", "lime"],
                "california": ["fig", "green_leaves"]
            }
            profile["notes_preference"].extend(note_map.get(breakfast_value, []))
        
        # 处理神秘学问题
        if "5" in user_answers:
            mystical_value = user_answers["5"]["value"]
            profile["specific_matches"]["mystical_match"] = mystical_value
            
            # 添加相关香调
            note_map = {
                "tarot": ["ambergris", "incense"],
                "runes": ["fir", "glacier_water"],
                "iching": ["agarwood", "tea"],
                "shamanic": ["sage", "wood_smoke"]
            }
            profile["notes_preference"].extend(note_map.get(mystical_value, []))
        
        # 处理旅行问题
        if "6" in user_answers:
            travel_value = user_answers["6"]["value"]
            profile["specific_matches"]["travel_match"] = travel_value
            
            # 添加相关香调
            note_map = {
                "easter_island": ["volcanic", "moss"],
                "vienna": ["velvet", "gold"],
                "bali": ["coconut", "seaweed"],
                "moon": ["metallic", "oxygen"]
            }
            profile["notes_preference"].extend(note_map.get(travel_value, []))
        
        return profile
    
    def _score_perfumes(self, user_profile: Dict[str, Any]) -> List[Tuple[Dict[str, Any], float]]:
        """为每个香水计算匹配分数"""
        scored_perfumes = []
        
        # 遍历所有香水
        for category, perfumes in self.perfumes_db.items():
            for perfume in perfumes:
                score = self._calculate_score(perfume, user_profile)
                scored_perfumes.append((perfume, score))
        
        # 按分数降序排序
        return sorted(scored_perfumes, key=lambda x: x[1], reverse=True)
    
    def _calculate_score(self, perfume: Dict[str, Any], profile: Dict[str, Any]) -> float:
        """计算单个香水的匹配分数"""
        score = 0.0
        
        # 1. 香调匹配 (最高权重)
        note_matches = 0
        for note in perfume["notes"]:
            if note in profile["notes_preference"]:
                note_matches += 1
        
        note_score = note_matches / max(len(perfume["notes"]), 1) * 5.0  # 满分5分
        score += note_score * 2.0  # 权重2
        
        # 2. 复杂度匹配
        complexity_diff = abs(perfume.get("complexity", 3) - profile["complexity_preference"])
        complexity_score = 5.0 - complexity_diff  # 差异越小分数越高
        score += complexity_score * 1.0  # 权重1
        
        # 3. 强度匹配
        intensity_diff = abs(perfume.get("intensity", 3) - profile["intensity_preference"])
        intensity_score = 5.0 - intensity_diff  # 差异越小分数越高
        score += intensity_score * 0.8  # 权重0.8
        
        # 4. 地域偏好匹配
        region_score = 0
        perfume_regions = perfume.get("region_affinity", [])
        for region in profile["region_affinity"]:
            if region in perfume_regions:
                region_score = 5.0
                break
        score += region_score * 0.5  # 权重0.5
        
        # 5. 特定匹配（电影、音乐等）
        specific_score = 0
        for match_type, match_value in profile["specific_matches"].items():
            if match_type in perfume and perfume[match_type] == match_value:
                specific_score = 5.0
                break
        score += specific_score * 1.5  # 权重1.5
        
        return score
    
    def _select_recommendations(self, scored_perfumes: List[Tuple[Dict[str, Any], float]], 
                               limit: int) -> List[Dict[str, Any]]:
        """从评分后的香水中选择推荐结果"""
        # 获取得分最高的香水
        top_perfumes = scored_perfumes[:limit]
        
        # 确保多样性 - 如果有多于3个香水，尝试从不同类别中选择
        if len(scored_perfumes) > limit * 2:
            categories_seen = set()
            diverse_selections = []
            
            for perfume, score in scored_perfumes:
                category = self._get_perfume_category(perfume)
                if category not in categories_seen and len(diverse_selections) < limit:
                    diverse_selections.append((perfume, score))
                    categories_seen.add(category)
            
            # 如果找到足够多的不同类别香水，使用它们
            if len(diverse_selections) == limit:
                top_perfumes = diverse_selections
        
        # 为每个推荐添加解释文本
        recommendations = []
        for perfume, score in top_perfumes:
            perfume_copy = perfume.copy()
            perfume_copy["recommendation_score"] = score
            perfume_copy["explanation"] = self._generate_explanation(perfume, score)
            recommendations.append(perfume_copy)
        
        return recommendations
    
    def _get_perfume_category(self, perfume: Dict[str, Any]) -> str:
        """确定香水所属的类别"""
        for category, perfumes in self.perfumes_db.items():
            if perfume in perfumes:
                return category
        return "unknown"
    
    def _generate_explanation(self, perfume: Dict[str, Any], score: float) -> str:
        """生成推荐解释文本"""
        explanations = [
            f"The {perfume['name']} by {perfume['brand']} features {' and '.join(perfume['notes'][:2])} that perfectly aligns with your preferences.",
            f"Based on your aesthetic choices, {perfume['name']} offers a {self._intensity_to_text(perfume.get('intensity', 3))} presence with {self._complexity_to_text(perfume.get('complexity', 3))} character.",
            f"This fragrance would be an excellent companion for your appreciation of {self._get_category_description(self._get_perfume_category(perfume))}."
        ]
        
        return " ".join(explanations)
    
    def _intensity_to_text(self, intensity: int) -> str:
        """将强度数值转换为描述文本"""
        intensity_map = {
            1: "subtle, intimate",
            2: "gentle, soft",
            3: "balanced, moderate",
            4: "pronounced, noticeable",
            5: "powerful, bold"
        }
        return intensity_map.get(intensity, "balanced")
    
    def _complexity_to_text(self, complexity: int) -> str:
        """将复杂度数值转换为描述文本"""
        complexity_map = {
            1: "straightforward, linear",
            2: "harmonious, simple",
            3: "nuanced, balanced",
            4: "intricate, layered",
            5: "complex, multifaceted"
        }
        return complexity_map.get(complexity, "balanced")
    
    def _get_category_description(self, category: str) -> str:
        """获取香水类别的描述文本"""
        category_map = {
            "floral": "delicate florals and refined elegance",
            "woody": "natural timbers and grounding elements",
            "oriental": "rich, warm spices and resins",
            "fresh": "crisp, invigorating atmospheres",
            "aromatic": "herbal clarity and natural elements",
            "gourmand": "delicious culinary-inspired notes",
            "chypre": "sophisticated mossy structures"
        }
        return category_map.get(category, "diverse scent profiles")


# 主函数示例
def main():
    """测试函数"""
    # 示例用户回答
    user_answers = {
        "1": {"value": "blade_runner"},
        "2": {"value": "jazz"},
        "4": {"value": "paris"},
        "5": {"value": "iching"}
    }
    
    # 创建推荐器
    recommender = PerfumeRecommender()
    
    # 获取推荐
    recommendations = recommender.recommend(user_answers)
    
    # 打印结果
    print(json.dumps(recommendations, indent=2))

if __name__ == "__main__":
    main() 