export default async function getDramadata(dramaDetails) {
    try {
        return {
            shareId: dramaDetails.shareId,
            messageIds: dramaDetails.messageIds || [],
            title: dramaDetails.title || "",
            year: dramaDetails.year || 0,
            posterUrl: dramaDetails.posterUrl || "0",
            shortUrl: dramaDetails.shortUrl || "null",
            trailerUrl: dramaDetails.trailerUrl || "null",
            subtitles: dramaDetails.subtitles || ["English Subtitles"],
            languages: dramaDetails.languages || ["Original"],
            tags: dramaDetails.tags || "drama",
            plot: dramaDetails.plot || "drama",
            country: dramaDetails.country || "not known",
            status: dramaDetails.status || "Completed",
            screenwriter: dramaDetails.screenwriter || "Unknown",
            director: dramaDetails.director || "Unknown",
            duration: dramaDetails.duration || "not known",
            aired: dramaDetails.aired || "not known",
            type: dramaDetails.type || "Drama",
            detail: dramaDetails.detail || "...",
            relatedContent: dramaDetails.relatedContent || [],
            screenshots: dramaDetails.screenshots || [],
            genres: dramaDetails.genres || [],
            quality: dramaDetails.quality || [],
            totalEpisodes: dramaDetails.totalEpisodes || 0,
            rating: dramaDetails.score || 0,
            episodes: [{ episode: 1, shortUrl: "link", teleUrl: "link" }],
        };
    }
    catch (error) {
        console.error("Error getting drama data:", error);
        return null;
    }
}
